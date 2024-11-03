import Pusher from "pusher";

const pusherId = process.env.PUSHER_APP_ID;
const pusherSecret = process.env.PUSHER_SECRET;
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherId || !pusherKey || !pusherSecret || !pusherCluster) {
  throw new Error(
    "PUSHER_ID, NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER and PUSHER_SECRET variables are required"
  );
}

export const pusher = new Pusher({
  appId: pusherId,
  key: pusherKey,
  secret: pusherSecret,
  cluster: pusherCluster,
  useTLS: true,
});
