const getUsers = async () => {
  try {
    const users = await prisma?.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return users;
  } catch (error) {
    console.error("Error in getUsers: ", error);
    return [];
  }
};

export default getUsers;
