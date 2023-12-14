---
title: Home
layout: home
---

# Associate Chapter of Lambda Phi Epsilon at THE Ohio State University

Lambda Phi Epsilon is an Asian Interest, but not Asian-exclusive social fraternity dedicated to fostering leadership, academic excellence, and a strong sense of community among its members. With a rich history and commitment to multiculturalism, Lambda Phi Epsilon empowers individuals to thrive in a supportive brotherhood that values personal growth, cultural awareness, and lifelong connections.


  <style>
        #counter-container {
            display: flex;
            justify-content: space-around;
            margin: 20px;
        }

        .counter {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        } 

        .counter p {
            font-size: 2em; /* Adjust the font size as needed */
            margin: 5px 0;
        }
  </style>
<body>

<div id="counter-container">
    <div class="counter">
        <p id="active-members-counter" style="font-size: 2.5em;">0</p>
        <p>Active Members</p>
    </div>
    <div class="counter">
        <p id="alumni-counter" style="font-size: 2.5em;">0</p>
        <p>Alumni</p>
    </div>
        <div class="counter">
        <p id="ethnicities" style="font-size: 2.5em;">0</p>
        <p>Unique Ethnicities</p>
    </div>
</div>

<script>
    let activeMembersCounter = 0;
    let alumniCounter = 0;
    let ethnicityCounter = 0;
    let activeMembersInterval;
    let alumniInterval;
    let ethnicityInterval

    function updateActiveMembersCounter() {
        document.getElementById('active-members-counter').innerText = activeMembersCounter;
        if (activeMembersCounter < 31) {
            activeMembersCounter++;
        }
    }

    function updateAlumniCounter() {
        document.getElementById('alumni-counter').innerText = alumniCounter;
        if (alumniCounter < 15) {
            alumniCounter++;
        }
    }
    function updateEthnicityCounter() {
    document.getElementById('ethnicities').innerText = ethnicityCounter;
    if (ethnicityCounter < 16) {
        ethnicityCounter++;
      }
    }

    function startCounters() {
        activeMembersInterval = setInterval(updateActiveMembersCounter, 100); // Update every 100 milliseconds
        alumniInterval = setInterval(updateAlumniCounter, 100); // Update every 100 milliseconds
        ethnicityInterval = setInterval(updateEthnicityCounter, 100); // Update every 100 milliseconds
    }

    function stopCounters() {
        clearInterval(activeMembersInterval);
        clearInterval(alumniInterval);
        clearInterval(ethnicityInterval)
    }
    startCounters();
</script>





{% include section.html %}


<h1><center>Learn More!</center></h1>

{% capture text %}

At Lambda Phi Epsilon International Fraternity Inc., our bonds of eternal brotherhood extend far beyond the college years. Our diverse membership, united by shared interests, values, and ideals, forms a lifelong connection. Rooted in high moral standards, each brother aspires to reach their fullest potential, collectively working towards the common goal of shaping a brighter future. 

{%
  include button.html
  link="brothers"
  text="Meet the Brothers"
  icon="fa-solid fa-arrow-left"
  flip=false
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/homepage_gallery/brothers.webp"
  link="brothers"
  title="Brothers"
  text=text
%}

{% capture text %}

What happens day to day with the lambdas? Our media team works nonstop to provide all the updates for you to follow along our journey of constant improvement and excellence! We also have archieves of our past reveals!

{%
  include button.html
  link="media"
  text="View our latest social posts and past reveals!"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/homepage_gallery/media.webp"
  link="media"
  title="Media"
  flip=true
  style="bare"
  text=text
%}

{% capture text %}

Visit our blog to keep up to date with all the exciting events and stories concerning our chapter! From rush events to class reveals, we have it all here!

{%
  include button.html
  link="events"
  text="View our events!"
  icon="fa-solid fa-arrow-left"
  flip=false
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/homepage_gallery/blog.webp"
  link="events"
  title="Our events"
  text=text
%}