import {
  Conversation,
  ConversationOnUser,
  Message,
  MessageSeen,
  User,
} from "@prisma/client";

export type TFullMessage = Message & {
  sender: User;
  seen: TFullMessageSeen[];
};

export type TFullMessageSeen = MessageSeen & {
  message: Message;
  user: User;
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
