---
layout: post
category : equipment
tagline: "Establishing a serial connection to your Pogoplug E02"
tags : [iot,  pogoplug, hardware]
---

### Intro

I personally used the modified version of the Pogoplug E02 with ArchLinux for various things, such as NFS, OwnCloud and most importantly as a gateway to SSH into my private network from anywhere in the world. I have gotten so used to my Pogoplug working 24/7 that <!--more-->I didn't think about it every breaking down - well it did. It is working, which I can tell by the Ethernet lights flashing shortly after attaching a power supply, but it does not run the SSH agent anymore. With the stock firmware long gone and the ArchLinux on the USB not booting(?) properly I was left with a (what you might call) soft-bricked device. Luckily there is still a way of executing commands on the Pogoplug using a serial connection. 

### Prerequisites
