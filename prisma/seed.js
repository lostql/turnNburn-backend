const prisma = require("../Configs/prisma.config");
async function main() {
  const tireReplacement = false;

  if (tireReplacement) {
    const tireReplacementTypes = [{ name: "Trailer" }, { name: "Truck" }];
    for (const type of tireReplacementTypes) {
      await prisma.tireReplacementType.upsert({
        where: { name: type.name },
        update: {},
        create: type,
      });
    }

    console.log("Tire replacement types seeded");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
