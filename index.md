---
layout: page
title: LeGit!
tagline: My minimalistic blog...
---
{% include JB/setup %}

![Me]({{ site.url }}/assets/cay.png)

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
    
## Posts

<div class="well">
	<ul class="posts">
	  {% for post in site.posts %}
	    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	  {% endfor %}
	</ul>
</div>



