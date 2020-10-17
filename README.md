<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

### Place Order Process
Customer create an **order** with **total**. The new order will be processed automaticaly via a payment service with total, if total is odd number (2,4,6,8), it will be **approved** and sent to Deliver department after 3 seconds. If total order is even numbers (1,3,5,7), the order will be canceled.

Customers can see all their orders if an order still is not **delivered** they can **cancel** it.

## Design Approach 
###  Domain-Driven Design (DDD)
The method to create a common sharing knowleage about business domain between developer and domain experts. The problem when building a large software in enterprise is developer have a little understand the business words, business processes. They will describe the business into thier own language. By the limitation of programming language, OOP, DB nomalization to describe the business, the output by developer does not reflect the real world.
Using or applying DDD from spec creatation to coding we can create a common language, understandable for both domain experts and developer

### User Process Mapping 

![The Process Mapping ](/docs/ddd-process-mapping.png)

Use DDD methodology to identify AggregateRoot, Enities, Domain Events, Bounded Context and Context map.
## The Architecture
![The Big picture](/docs/thebigpicture.png)

Apply Event Sourcing and CQRS architect parttern 
## Event Driven Orchestration

![Event Driven](/docs/event-orchestration.png)

Use Event Driven to make mircroservers loosing couple.


## Installation

```bash
$ npm install
```
## Start Mongo & RabbitMQ
```bash
$ docker-compose up -d
```
## Running the Order Service

```bash
cd order
# development
$ npm run start

# watch mode
$ npm run start:dev

# Replay all history events and update query side 
$ npm run start:viewdb

```
## Running the Order Service
```bash
$ cd payment
# development
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test
```
### Endpoints:
Create Order
POST
```
http://localhost:3000/order/

{
    "user_id": "test_user",
    "total": 2
}
```
Cancel Order
PUT
```
http://localhost:3000/order/cancel

{
    "id": "56f9222e-f731-47b8-aeb7-66112ca511d0",
}
```

## Next
- Make Dokerfile
- Deploy to Kubernestes environment (Helm chart)
- Make service mesh (Istio) and log monitering
- Make CloudFomation file with EKS


## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
