---
layout: page
title: LeGit!
tagline: My minimalistic blog...
---
{% include JB/setup %}

## Info

My name: {{ site.author.name }}

Check out my website at [MyHappyIsland](http://www.myhappyisland.com)
    
## Posts

<div class="well">
	<ul class="posts">
	  {% for post in site.posts %}
	    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	  {% endfor %}
	</ul>
</div>



