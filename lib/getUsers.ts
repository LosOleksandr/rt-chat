const getUsers = async (email: string) => {
  try {
    const users = await prisma?.user.findMany({
      where: { NOT: { email } },
      orderBy: { createdAt: "desc" },
      omit: {
        password: true,
      },
    });

    if (!users) {
      return [];
    }

    return users;
  } catch (error) {
    console.error("Error in getUsers: ", error);
    return [];
  }
};

export default getUsers;
