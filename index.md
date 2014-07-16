---
layout: page
title: LeGit!
tagline: My minimalistic blog...
---
{% include JB/setup %}

## Info

My name: {{ site.author.name }}

My location: {{ site.author.location }}

Voice: {{ site.author.tel }}

Follow me on Twitter: [@{{ site.author.twitter }}]({{ site.author.twitter_url }})

Check out my website at [site.author.website](site.author.website_url)
    
## Posts

<div class="well">
	<ul class="posts">
	  {% for post in site.posts %}
	    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	  {% endfor %}
	</ul>
</div>



