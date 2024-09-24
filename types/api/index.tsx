import {
  Conversation,
  ConversationOnUser,
  Message,
  User,
} from "@prisma/client";

export type TFullMessage = Message & {
  sender: User;
  seen: User[];
};

export type TFullConversation = Conversation & {
  users: TFullConversationOnUser[];
  messages: TFullMessage[];
};

export type TFullConversationOnUser = ConversationOnUser & {
  user: User;
};

export type TUsersWithConversationExists = User & {
  conversationExists: string;
};
