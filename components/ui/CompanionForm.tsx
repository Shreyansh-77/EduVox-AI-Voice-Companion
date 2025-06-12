"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { useRouter } from "next/navigation"
import { createCompanion } from "@/lib/actions/companion.actions"

const formSchema = z.object({
  name: z.string().min(1, "Companion name is required"),
  subject: z.string().min(1, "subject name is required"),
  topic: z.string().min(1, "topic name is required"),
  voice: z.string().min(1, "voice name is required"),
  style: z.string().min(1, "style name is required"),
  duration: z.coerce.number().min(1, "duration name is required"),
})

const CompanionForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 15,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const companion = await createCompanion(values);

      if(companion) {
        router.push(`/companions/${companion.id}`);
      } else {
        console.error("Failed to create companion");
        router.push(`/`);
      }
    } catch (error) {
      console.error("Error creating companion:", error);
      router.push(`/`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your companion name" {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}

                  >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <textarea placeholder="Ex. Derivatives & Integrals" {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}

                  >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="male">
                        Male
                      </SelectItem>
                      <SelectItem value="female">
                        Female
                      </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}

                  >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="formal">
                        Formal
                      </SelectItem>
                      <SelectItem value="casual">
                        Casual
                      </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="15"
                  {...field} 
                  className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Build your own companion</Button>
      </form>
    </Form>
  )
}

export default CompanionForm
