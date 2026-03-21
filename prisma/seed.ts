// prisma/seed.ts
// Initial seed data for development

import { PrismaClient, UserRole, ProjectStatus, CohortStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.bootcampProgram.deleteMany();
  await prisma.client.deleteMany();
  await prisma.dashboard.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@starlabs.dev",
      password: "$2b$10$dummy", // Replace with actual bcrypt hash
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      profile: {
        create: {
          timezone: "America/New_York",
        },
      },
    },
  });

  console.log("✓ Admin user created:", admin.email);

  // Create founder/CEO
  const founder = await prisma.user.create({
    data: {
      email: "founder@starlabs.dev",
      password: "$2b$10$dummy",
      firstName: "Ben",
      lastName: "Adayehi",
      role: UserRole.FOUNDER,
      profile: {
        create: {
          timezone: "America/New_York",
          department: "Executive",
          title: "Founder & CEO",
        },
      },
    },
  });

  console.log("✓ Founder created:", founder.email);

  // Create delivery lead
  const deliveryLead = await prisma.user.create({
    data: {
      email: "delivery@starlabs.dev",
      password: "$2b$10$dummy",
      firstName: "Sarah",
      lastName: "Johnson",
      role: UserRole.DELIVERY_LEAD,
      profile: {
        create: {
          timezone: "America/New_York",
          department: "Delivery",
          title: "VP Engineering",
        },
      },
    },
  });

  console.log("✓ Delivery Lead created:", deliveryLead.email);

  // Create sample engineers
  const engineers = [];
  for (let i = 1; i <= 5; i++) {
    const engineer = await prisma.user.create({
      data: {
        email: `engineer${i}@starlabs.dev`,
        password: "$2b$10$dummy",
        firstName: `Engineer`,
        lastName: `${i}`,
        role: UserRole.ENGINEER,
        profile: {
          create: {
            timezone: "Africa/Lagos",
            department: "Engineering",
            title: "Software Engineer",
          },
        },
        engineerProfile: {
          create: {
            seniority:
              i === 1 || i === 2 ? "JUNIOR" : i === 3 ? "MID" : "SENIOR",
            yearsOfExperience: i * 2,
            specializations: [
              "React",
              "Node.js",
              "TypeScript",
              "PostgreSQL",
            ],
          },
        },
      },
    });
    engineers.push(engineer);
    console.log(`✓ Engineer ${i} created:`, engineer.email);
  }

  // Create bootcamp program
  const cohort = await prisma.bootcampProgram.create({
    data: {
      name: "Cohort 1 - Q1 2024",
      description: "First bootcamp cohort - Full-stack development",
      curriculum: "Full-Stack Web Development",
      status: CohortStatus.IN_PROGRESS,
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-04-15"),
      maxEnrollees: 30,
      instructors: [deliveryLead.id],
      requirements: {
        minScore: 60,
        coding: "required",
        english: "required",
      },
      syllabus: {
        week1: "HTML, CSS, JavaScript basics",
        week2: "React fundamentals",
        week3: "Node.js and Express",
        week4: "Databases",
        week5: "Cloud deployment",
        week6: "Capstone project",
      },
    },
  });

  console.log("✓ Bootcamp cohort created:", cohort.name);

  // Create sample client
  const client = await prisma.client.create({
    data: {
      name: "TechCorp Inc.",
      industry: "SaaS",
      website: "https://techcorp.example.com",
      status: "ACTIVE",
      contactName: "John Doe",
      contactEmail: "john@techcorp.example.com",
      contactPhone: "+1-555-0100",
      addressStreet: "123 Tech Street",
      addressCity: "San Francisco",
      addressState: "CA",
      addressZip: "94105",
      addressCountry: "USA",
      budget: 500000, // $500k annual
    },
  });

  console.log("✓ Client created:", client.name);

  // Create sample project
  const project = await prisma.project.create({
    data: {
      name: "E-commerce Platform",
      description:
        "Build a modern e-commerce platform with React frontend and Node.js backend",
      status: ProjectStatus.IN_PROGRESS,
      clientId: client.id,
      deliveryLeadId: deliveryLead.id,
      startDate: new Date("2024-02-01"),
      targetEndDate: new Date("2024-05-01"),
      budget: 75000, // $75k
      members: {
        create: [
          {
            userId: engineers[0].id,
            role: "DEVELOPER",
            allocatedHours: 40,
            allocatedPercentage: 100,
          },
          {
            userId: engineers[1].id,
            role: "DEVELOPER",
            allocatedHours: 40,
            allocatedPercentage: 100,
          },
          {
            userId: engineers[2].id,
            role: "QA",
            allocatedHours: 20,
            allocatedPercentage: 50,
          },
        ],
      },
    },
  });

  console.log("✓ Project created:", project.name);

  // Create dashboard
  const dashboard = await prisma.dashboard.create({
    data: {
      name: "Operations",
      totalEngineers: engineers.length,
      activeProjects: 1,
      monthlyRevenue: 75000,
      utilizationRate: 85.5,
      burnRate: 12000,
      runway: 6,
      grossMargin: 35.5,
    },
  });

  console.log("✓ Dashboard created:", dashboard.name);

  console.log("✅ Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
