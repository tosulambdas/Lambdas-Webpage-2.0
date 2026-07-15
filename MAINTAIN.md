# Maintenance Doc

This file is documentation for maintaing the website, this should be done when an error is spotted, a new class is revealed and when the eboard is installed

# Table of Content
- ## Adding a New Member
- ## Adding a New Class
- ## Updating Eboard

## Adding a New Member

This site stores individual member pages in the `_members/` collection. Each member page is a Markdown file whose front matter defines the member's profile data and whose body contains the page content.

### 1. Pick a filename and member number

- The file belongs in `_members/`.
- Use a filename like `99lastname.md` or `33jchoi.md`.
- The `number:` field must be the member's chapter number.
- Keep filenames lowercase, no spaces, and use the member number plus a short slug.

### 2. Create the new member file

Make a new file in `_members/` with YAML front matter. Example:

```md
---
number: 99
fn: First
ln: Last
mn: Middle
image: images/bros/99lastname.webp
group: theta
role: undergrad
description: "Nickname or short descriptor"
ethinicity: Filipino
major:
- Computer Science
father: 0
children:
- 0
links:
  instagram: https://instagram.com/example
  twitter: https://twitter.com/example
  linkedin: https://www.linkedin.com/in/example
---

# {{ page.fn }} {{ page.ln }} | {{ page.role }}

## [{{ page.group | capitalize }} Class](/brothers/{{ page.group }}s)

Ethinicity: {{ page.ethinicity }}

Major: {{ page.major | join: ', ' }}
```

Notes:
- Use `ethinicity:` exactly as the site template expects.
- `major:` is a list and will be joined with commas in the page.
- `father:` and `children:` are lineage fields; use `0` for no value.

### 3. Add the member image

- Place the image in `images/bros/`.
- Use the same file name referenced by `image:`.
- Prefer `.webp` for performance, but `.png` and `.jpg` also work.

### 4. Choose the right `group` and `role`

- `group` controls which class page the member appears on.
- Common groups: `charter`, `alpha`, `beta`, `gamgam`, `delta`, `epsilon`, `zeta`, `eta`, `theta`.
- `role` is usually `undergrad` or `alumni`.

### 5. Confirm the member appears correctly

- Preview the site locally.
- Visit `/members/<slug>` for the member page.
- Visit `/brothers/<group>s/` to confirm the member appears in the class page.

### 6. Commit your changes

- Add the new `_members/<filename>.md` file.
- Add the image file under `images/bros/` if applicable.
- Commit with a clear message, e.g. `Add new member 99 Lastname`.



## Adding a New Class

Class pages live under `brothers/<group>s/index.md`. Each class page shows class metadata and uses the `members` collection to display members whose `group` matches the class.

### 1. Create the class page

- Create a folder named with the plural class group, for example: `brothers/thetas/`.
- Create `brothers/thetas/index.md` inside that folder.
- Set the page front matter to use the `brothers` layout and give it a title.

Example:

```md
---
title: Theta Class
author: 
layout: brothers
---

## Theta Class "Tensei Thetas" | FA25
{:.center}
**New Member Educator**: Guanzhou “STEEZY” Zheng
{:.center}
**Assistant New Member Educator**: Alex “CHIKΛ” Zhang
{:.center}
**Class Song**: _Bye Bye Bye_ by NSYNC
{:.center}
**Class Motto**: _"You were never meant to fit in – you were meant to become."_
{:.center}

{% include components/list.html data="members" component="components/portrait" filters="group: theta" %}
```

### 2. Match the class group string

- The `filters="group: theta"` line must match the member `group` value exactly.
- If the class folder is `brothers/zetas/`, use `group: zeta` on member files.

### 3. Update the main brothers page

Add the new class to `/brothers/index.md` so it appears in the class grid and site navigation.

Example update for the grid area:

```liquid
{% include figure.html image="images/media/thetas.webp" caption="Theta Class - Tensei Thetas" link="/brothers/thetas/" %}
```

If the class is new, add a new section on `/brothers/index.md` with the same class metadata and an include filter for `group: <group>`.

### 4. Confirm the class page works

- Preview the site locally.
- Visit `/brothers/<group>s/`.
- Confirm the class list shows the correct members.
- Confirm the `/brothers/` page links to the new class.

### 5. Commit your changes

- Add the new `brothers/<group>s/index.md` file.
- Update `brothers/index.md` if needed.
- Commit with a message like `Add new class page for Theta`.

## Notes

- `_config.yaml` sets `_members/` pages to use the `member` layout automatically.
- Class pages use the `brothers` layout and a member list include.
- `group` is the core connection between member pages and class pages.


## Updating the Eboard

GO to `/_data/eboard.yaml`
Update the name, position image and link
Example:

```md
- name: Justin Bailey
  position: President
  image: images/eboard/president.webp
  link: 48jbailey
```
- Please Please Please don't include the Educator on the eboard, 
- For the link: use the filename of the people holding the position in _members folder
- Update the image at the `images/eboard` folder as well

