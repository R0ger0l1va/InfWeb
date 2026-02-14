import { LoveMessages } from "@/src/types/specialEvents/loveMessages";
import apiClient from "../api/api-client";

const loveMessagesData = {
  getMessages: async (): Promise<LoveMessages[]> => {
    const res = await apiClient.get("/love-message");
    return res.data;
  },
  incrementLikes: async (id: number | string): Promise<LoveMessages> => {
    const res = await apiClient.patch(`/love-message/${id}/like`);
    return res.data;
  },
};

export default loveMessagesData;
