---
title: Rush
layout: rush
nav:
  order: 4
  tooltip: Interested in joining?
---
{% assign members = site.members | default: empty %}
{% assign actives = site.members | where: "role", "undergrad" %}

# Welcome to Lambda Phi Epsilon Rush!

We’re excited to meet new brothers and share what Lambda Phi Epsilon is all about! Our chapter is built on **brotherhood, leadership, and service**, and we welcome anyone who wants to grow with us both socially and professionally.

---

## About Our Chapter

Lambda Phi Epsilon is an Asian-interest fraternity dedicated to:

- **Brotherhood:** Lifelong friendships and a strong support system  
- **Leadership:** Opportunities to lead committees, events, and initiatives  
- **Service:** Giving back to the community through philanthropy and volunteering  

We currently have **{{ site.members | where: "role", "undergrad" | size }} active members** at The Ohio State University and have been on campus since 2020. Join us to make an impact!

---