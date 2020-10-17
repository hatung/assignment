<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## User Journey
### Place Order Process
In the My Order page, customer can create an **order** by click Create button, an order form is opened and customer can select and add some **order items** while adding they can see the **total** of order then summit the form.
The new order will be process it will be automaticaly charged from customer credit, if customer credit is enough for total of order, it will be **confirmed** and sent to Deliver department. otherwise, it will be **declined**

Customers can see all their **created** orders in this pages if an order still is not **delivered** they can **cancel** it.

## Design Approach 
###  Domain-Driven Design (DDD)
The method to create a common sharing knowleage about business domain between developer and domain experts. The problem when building a large software in enterprise is developer have a little understand the business words, business processes. They will describe the business into thier own language. By the limitation of programming language, OOP, DB nomalization to describe the business, the output by developer does not reflect the real world.
Using or applying DDD from spec creatation to coding we can create a common language, understandable for both domain experts and developer

### User Process Mapping 


#### The models ()



#### Domain Events

#### Boundary Context

### Event sourcing & CQRS

### Why Event sourcing  CQRS
#### CAP theorem

# The Architecture




## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
