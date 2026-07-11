1. Right now the images are laoding for the projects, media via url; but what I want is a seperate folder to store the image files locally and load it from there; this is because the images that are now loading are from different website and not related;

2. current project data is in the following format,

```json
{
    "id": "ir-internship-portal",
    "title": "IR INTERNSHIP Portal",
    "summary": "Full-stack internship management portal with responsive Next.js frontend and NestJS REST APIs.",
    "category": "technical",
    "tags": ["Personal Project"],
    "institution": "IR INFOTECH",
    "date": "03/2025",
    "coverImage": "https://images.unsplash.com/photo-1461740680684-dccba630e2f6?w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    ],
    "description": "Designed and planned the user interface (UI), developed the responsive frontend using Next.js, engineered robust RESTful APIs with NestJS, and managed full-stack project deployment utilizing Vercel for the frontend and a VPS server for the backend to ensure high availability and performance.",
    "highlights": [
      "Designed and planned the user interface (UI)",
      "Developed the responsive frontend using Next.js",
      "Engineered robust RESTful APIs with NestJS",
      "Managed full-stack deployment on Vercel and VPS"
    ],
    "technologies": ["Next.js", "NestJS", "TypeScript", "Vercel", "REST APIs"]
  }
```

This has to be changed to,

```json
{
    "id": "ir-internship-portal",
    "title": "IR INTERNSHIP Portal",
    "summary": "Full-stack internship management portal with responsive Next.js frontend and NestJS REST APIs.",
    "category": "technical",
    "tags": ["Personal Project"],
    "institution": "IR INFOTECH",
    "date": "03/2025",
    "coverImage": "https://images.unsplash.com/photo-1461740680684-dccba630e2f6?w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    ],
    "description": "Designed and planned the user interface (UI), developed the responsive frontend using Next.js, engineered robust RESTful APIs with NestJS, and managed full-stack project deployment utilizing Vercel for the frontend and a VPS server for the backend to ensure high availability and performance.",
    "highlights": [
      "Designed and planned the user interface (UI)",
      "Developed the responsive frontend using Next.js",
      "Engineered robust RESTful APIs with NestJS",
      "Managed full-stack deployment on Vercel and VPS"
    ],
    "technologies": ["Next.js", "NestJS", "TypeScript", "Vercel", "REST APIs"],
    "is_featured": "no"
  }
```

the featured projects will come first and if there are more than 3 rows of projects being shown, then add pagination to load next set of projects.

3. For storing the images locally prepare a dedicated directory and inside that directory we have the folders as projects, achivements, milestones where i will be dumping the images;

4. Right now we are having the send message option in the bottom, but it is not integrated with the email service; so that plan would be the visitor enters the details and click on send and the notification should reach my email at pruthvirajgowda2002@gmail.com; how can we do that? can we use any external api's or can we implement it in frontend using own smtp information?

5. The moments and milestones section that we are currently having are just like blog, I will be writing few blogs are adding it here; hence the json file should have the format that represent a blog rather than a project work.

6. The skills has to be categorized as research and technical.
