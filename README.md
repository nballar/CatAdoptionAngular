# Project 2: Neko Atsume Adoption Agency

L.J.O., J.E., N.B., B.E.

This project will seek to build an application that allows users to adopt cats from the mobile game Neko Atsume, provided by the [Neko Atsume API](https://neko-atsume.emshea.com/). Users gain points by login frequency and by completing tasks. These points can then be traded for the cats based on their power level, a value obtained from the API.

Our [backend server](https://github.com/bescoto98/CatAdoptionServer) is currently running on an EC2 instance.

## Requirements

Users can:
* Register
* Login/Logout
* Update their information
* View cat profiles based on the API
* See a list of cats they have adopted
* Generate to-do lists that allow them to gain points once a task is completed
 * Create a task
 * Mark a task as complete
* See cats available for adoption
* Use points accumulated on login and task completion to adopt cats
* Sort/filter for cats

* **Stretch Goals:**
  * Introduce goodies into the ecosystem


* **Mandatory Technologies:**
  * Spring Framework, Spring Boot, Spring AOP and Spring Data JPA
  * Hibernate
  * Angular
  * Log4j
  * JUnit, Mockito
  * Jenkins Pipeline
  * AWS RDS and EC2
