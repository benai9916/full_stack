import z from "zod";

export const inputMessageSchema = z.object({
  text: z.string(),
  hasImage: z.boolean().optional(),
  file: z.any(),
})
export const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  imgUrl: z.string().optional(),
})
export type InputMessageSchema = z.TypeOf<typeof inputMessageSchema>
export type Message = z.TypeOf<typeof messageSchema>;
