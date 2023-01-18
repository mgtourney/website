# Website 🖥️

The official website for Magnesium!

## Consists of

| Page | Route | Description |
| :----: | :-: | :-: |
| Frontpage | `/` | The frontpage of the website. |
| Team | `/team` | The team-page of the website. |
| Calendar (WIP) | `/calendar` | The calendar-page of the website. |
| Rules | `/rules` | The rules-page of the website. |
| Admin | `/admin` | The admin-page of the website. Requires authorization |

## JSON-paths:
| File | Hydrates |
| :----: | :-: |
| `https://URL/assets/staff/data.json` | `/calendar` |
| `https://URL/api/rules` | `/rules` |
| `https://URL/api/rules` | `/team` |

## TODO:

### Frontend
- [x]  Restyle calendar/rules-page
- [ ]  Panel for controlling calendar/rules/team-page
### Backend
- [x]  Error handling on data-fetching
- [x]  API routes for calendar/rules/team-page
     - [ ]  Move calendar to database.
     - [x]  Move rules to database.
     - [x]  Move team-page to database.

#

## Database 🗄️
- [Explanation of the arrays in the database](DATABASE.MD)
- [SQL-file for creating the database](DB.sql)

# Want to help?
## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `dev` - Pretties the code & runs the development server.
- `build` - Builds the application for production usage.
- `start` - Runs the built application in production mode.
- `prod` - Pretties the code, builds the application, and runs it in production mode.
- `lint` - Runs ESLint on the project.
- `format` - Runs Prettier on the project.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Tailwind CSS, take a look at the following resources:

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS features and API.
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) - a cheat sheet for Tailwind CSS classes.

To learn more about Flowbite, take a look at the following resources:

- [Flowbite Documentation](https://flowbite.com/docs) - learn about Flowbite features and API.
- [Flowbite Community](https://community.flowbite.com) - a community for Flowbite users.

## License 📜

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details
