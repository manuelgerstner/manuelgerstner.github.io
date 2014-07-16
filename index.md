---
layout: page
title: LeGit!
tagline: My minimalistic blog...
---
{% include JB/setup %}

## Recent

{% for post in site.posts %}
	<h2>{{ post.title }}</h2>
    	{{ post.excerpt }}
   	<a href="{{ post.url }}">Read more...</a>
{% endfor %}
    
## Posts

<div class="well">
	<ul class="posts">
	  {% for post in site.posts %}
	    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	  {% endfor %}
	</ul>
</div>



