"use server"

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { th } from "zod/v4/locales";

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
