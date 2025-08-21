import fs from "fs"
let force = "&force=true";
let host = "http://localhost:3000/api/";
// let host = "https://api.are.na/v2/";

let projects_fetch = await fetch(host + "channels/projects-fat_s9oqj8?per=100" + force)
  .then((res) => res.json())
  .then((res) => res.contents);

console.log(projects_fetch.title);
let projects = [];

for (let i = 0; i < projects_fetch.length; i++) {
  await get_channel(projects_fetch[i].id).then((res) => {
    console.log(res.title);
    projects.push(res);
  });
}

const data = {
  projects,
};


fs.writeFileSync("data.js", "export const data = " + JSON.stringify(data, null, 2) + ";");

// function format_projects(projects) {
//   let p = projects.map((p) => {
//     let title = p.title;
//     let id = p.id;

//     let images = p.contents
//       .filter((x) => x.class == "Image")
//       .map((i) => ({
//         title: i.title,
//         image: i.image,
//       }));

//     return { title, type, id, images, sub_type, completed, sqft };
//   });

//   return p;
// }

// -------------------------
// UTILS
async function get_channel(id) {
  let project = await fetch(host + "channels/" + id + "?per=100"+force).then((res) => res.json());

  console.log(project.title);
  return project;
}
