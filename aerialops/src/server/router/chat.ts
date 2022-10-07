import { ObjectId } from "bson";
// local
import { Message, inputMessageSchema } from "src/constants/schema";
import { createRouter } from "../createRouter";
import { getSignedUrl } from "@/utils/getSignedUrl";

export const chatRouter = createRouter()
  .query("list", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.chatData.findMany();
    },
  })
  .mutation("add", {
    input: inputMessageSchema,
    resolve: async ({ ctx, input }) => {
      let uploadedUrl;
      if (input.hasImage) {
        uploadedUrl = await getSignedUrl(input);
      }
      const message: Message = {
        id: String(new ObjectId()),
        imgUrl: uploadedUrl,
        text: input.text,
      };
      await ctx.prisma.chatData.create({ data: message });
      return await message;
    },
});
