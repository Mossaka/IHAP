# Project Idea Hub Site: IHaveAProblem.com (IHAP)
url: https://ihap-2018.firebaseapp.com

## Introduction

A good project begins with a problem. Too many times at hackathons and project courses, developers lack specific problems or a sense of prioritization as to which problems are more pressing and in need of solving. To provide meaningful project ideas, I.H.A.P. helps bring together people who want project solutions and people who want to develop projects to streamline efforts in engineering and sustaining solutions that are in progress.

## Introduction Video
<a href="http://www.youtube.com/watch?feature=player_embedded&v=o8zNCNKvvBE
" target="_blank"><img src="http://img.youtube.com/vi/o8zNCNKvvBE/0.jpg" 
alt="Go to the video!" width="480" height="360" border="10" /></a>

youtube link: https://youtu.be/o8zNCNKvvBE


## Requirements

  * A modern JavaScript enabled desktop web browser
  * Mobile browsers are not supported
  * The latest version of Google Chrome is recommended  


## How to Run

Please open https://ihap-2018.firebaseapp.com in a web browser.


## Login Credentials

Our website allows new users to create their own accounts easily. However, we also provide a shared account for testing purposes. 

(Email: test@gmail.com, Password: ucsdihap)


## Contacts for Technical Support

  * Sui (Shawn) Gao (858-353-5554) sugao@ucsd.edu Software Architect
  
  * Jiaxiao (Joe) Zhou (444-996-3942) jiz417@ucsd.edu Project Manager

## Directory Structure
| Directory 	| Usage         |
|:------------- |:-------------|
| public/    	| [index.html of this website] | 
| src/      	| [source code]      |
| src/assets/ 	| [images used in this website]    |
|src/common/  	| [React components used in multiple places] |
|src/home/	|[React components for the home page] |
|src/profile/	|[React components for the profile page]|
|src/search/	|[React components for the search results]|
|src/ticket/	|[React components for showing/editing problems and solutions]|
|src/utils/	|[Utility functions]|


## Code Structure

We organized our source files by their functionalities in this application. Specifically, each source file corresponds to one and only one React component except the utility source files. 

Every component has a “render function” which returns the html structure of that component as JSX. The other methods in that component implement business logic and trigger a re-render when necessary. Most components have a corresponding scss file which defines CSS rules for that component. 

We didn’t organize our source code in a traditional MVC manner, but the MVC pattern is still visible. The render function in each component defines the view, the other methods act as controllers. Since JavaScript is a dynamically typed language and supports object literals, we don’t need classes to define data models. Instead, the application talks directly to the database through the firebase API. 


## Known Bugs

Concurrent operations from multiple instances of the application may cause undesired outcomes. Such as a negative number of votes.

## Team
We Have A Problem (W.H.A.P.)

## Members
Project Manager: 			Jiaxiao “Joe” Zhou

Senior System Analyst: 			Geeling Chau

Software Development Lead: 		Dian Lin

Software Architect: 			Sui Gao

Quality Assurance Lead: 		Kevin Yinjan Huang

Algorithm Specialist: 			Xindong Cai, Xuanqiang Zhao

Business Analyst: 			Jiayue “Coraline” Sun

Database Specialist: 			Guanxin Li

User Interface Specialist: 		Yuqi Kang
