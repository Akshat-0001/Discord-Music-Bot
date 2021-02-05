module.exports = async client => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setStatus("idle");
  await client.user.setActivity(`;help | Developed  Akshat |`);
};
