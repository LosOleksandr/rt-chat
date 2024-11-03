import PusherClient from "pusher-js";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherKey || !pusherCluster) {
  throw new Error(
    "NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER variables are required"
  );
}

export const pusherClient = new PusherClient(pusherKey, {
  cluster: pusherCluster,
});
