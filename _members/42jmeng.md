---
number: 42
fn: Jerry
ln: Meng
mn: 
image: images/bros/42jmeng.webp
group: delta
role: undergrad
description: JOΛT
ethinicity: Chinese
major:
- Computer Science & Engineering
father: 27
children:
- 65
links:
  instagram:
  twitter:
  linkedin:
---

# {{ page.fn }} {{ page.ln}} | {{ page.role }}

## [{{ page.group|capitalize }} Class](/brothers/{{page.group}}s)

Ethinicity: {{ page.ethinicity }}

Major: {{ page.major | join: ', ' }}
