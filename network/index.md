---
title: Network
nav:
  order: 6
  tooltip: See the achievements of the brothers of LPhiE
---

{:.center}
{% include icon.html icon="fa-solid fa-users" %}Alumnies
{% include section.html %}

{% capture content %}


{% include list.html data="members" component="portrait" filters="role: alumni" %}

{% endcapture %}

{% include grid.html style="square" content=content %}

{%include section.html%} 
{:.center}
<!-- ## Networking
{:.center} -->