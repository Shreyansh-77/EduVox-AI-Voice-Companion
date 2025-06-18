"use server"

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

interface CreateCompanion {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
}

export const createCompanion = async (formData: CreateCompanion) => {
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("companions")
        .insert({
            ...formData,
            author,
        })
        .select();

    if (error || !data) throw new Error("Failed to create companion");
    return data[0];
}

export const getAllCompanions = async({  page = 1, subject,topic}: GetAllCompanions)=> {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query.ilike('subject', `%${subject}%`)
    .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  }else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  
  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanions = async({limit = 10,  page = 1, subject,topic}: GetAllCompanions)=> {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query.ilike('subject', `%${subject}%`)
    .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  }else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);
  
  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);

  return companions;
};

export const getPopularCompanions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('popular_companions') // <-- View or RPC result
    .select('*')
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
};


export const getCompanion = async (id:string)=>{
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq('id', id)

  if (error) return console.log(error);
  return data[0];
}

export const addToSessionHistory = async( companionId:string)=>{
  const {userId} = await auth();
  const supabase = createSupabaseClient();
  const { data, error }= await supabase.from('session_history').insert({
    companion_id : companionId,
    user_id : userId,
  })

  if(error) throw new Error(error.message);
  return data;
}

export const getRecentSession = async(limit=10) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if(error) throw new Error(error.message);
  return data.map(({companions})=> companions);
}

export const getUserSession = async(userId:string, limit=10) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase
    .from('session_history')
    .select('companions:companion_id(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if(error) throw new Error(error.message);
  return data.map(({companions})=> companions);
}

export const getUserCompanion = async(userId:string) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase
    .from('companions')
    .select()
    .eq('author', userId)
    .order('created_at', { ascending: false })
  
  if(error) throw new Error(error.message);
  return data;
}

export const newCompanionPermission = async () => {
  const {userId, has} = await auth();
  const supabase = createSupabaseClient();

  let limit = 3;

  if(has({plan: 'pro'})){
    return true;
  }else if(has({plan : 'explorer'})){
    limit = 10
  }

  console.log(limit)
  
  const {data, error} = await supabase
    .from('companions')
    .select('id', { count: 'exact' })
    .eq('author', userId)

    if(error) throw new Error(error.message);
    const companionCount = data?.length;

    console.log(companionCount)

    if(companionCount >= limit){
      return false;
    }else{
      return true;
    }
}

export const newConversationPermission = async () => {
  const {userId, has} = await auth();
  const supabase = createSupabaseClient();
  
  if (!userId) {
      return Response.json({ error: 'User is not signed in' }, { status: 401 })
  }


  let limit = 10;

  if(has({plan: 'pro'})){
    return true;
  }else if(has({plan : 'explorer'})){
    return true;
  }

  console.log(limit)
  
  const {data, error} = await supabase
    .from('session_history')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)

    if(error) throw new Error(error.message);
    const sessionnCount = data?.length;

    console.log(sessionnCount)

    if(sessionnCount >= limit){
      return false;
    }else{
      return true;
    }
}


export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }


  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};


export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`) 
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  
  return data.map(({ companions }) => companions);
};
