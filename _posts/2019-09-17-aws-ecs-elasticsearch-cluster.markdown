---
layout: post
title:  "Set up an Elasticsearch cluster on AWS ECS"
date:   2019-09-17 11:49:45 +0200
categories: [aws,cloud,tech]
---

![Docker Containers ECS](/assets/images/container-docks.jpg)

**A hands-on guide on how to integrate an Elasticsearch Cluster into your existing AWS architecture using Cloudformation, ECS and Docker and how to connect an existing Spring Boot application to it**

## Our scenario

My team and I were given the task of elevating our search feature to a new level. The search we had implemented in our Spring Boot application before was developed using only the database. We evaluated different options and quickly came to the conclusion that Hibernate Search 6 (yes, currently only in alpha) would be the way to go. Playing around with it locally made our search a lot better and more intuitive. 

## Why Elasticsearch?

The solution did however reveal another problem to us. Under the hood Hibernate search uses Lucene locally for indexing and this breaks in any highly-available cloud environment that has more than one instance of the same application running. Two of the Hibernate Search developers (who were extremely helpful on the Hibernate Zulip chat) explained to us that Hibernate Search 6 comes with full Elasticsearch support and, albeit only available as an alpha version, already supports most features needed. As the final release is just around the corner, getting Hibernate Search 6 up and running with Elasticsearch providing the search support seemed like a reasonable decision to us.

