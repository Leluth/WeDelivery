# Variables interact with database

## Login & Registration page 
|  Variable | Type | Instruction  |   
|---|---|---|
| id_user | int |  unique number for each user (corresponding to email) |   
| first_name| String  | first name of the user  |   
| last_name  | String  | last name of the user  |   
| email  |  String | email address of the user  |   
| user_name  |  String | user name of the user  |   
| password |  String | password of the user  |   
| created_at  | String  | the time that account was first created  |   
| updated_at | String  |  the time that account was edited |   
| enabled  | boolean  | account is set active/inactive  |   
---
## Package & Order page 
|  Variable | Type | Instruction  |   
|---|---|---|
| id_package | int | unique number for each package information|   
| weight| double  | weight of the package  |   
| size  | double  |  size of the package |   
| package_type  |  enum |  [small, medium, big, *fragile?*] |   
| shipping_from |  String | where to pick up the pacakge  |   
| shipping_to  | String  | where to ship the package  |   
| id_order | int | unique number for placed order |   
| service_type| enum  | [drone, robot, hybrid]  |   
| deliver_type  | enum  | [Express, Standard, Economic]   |   
| price  |  double |  price of the option user select |   
| ordered_at |  String | the time that order is placed  |   
| delivered_at  | String  |  estimated delivery time |  
| status | enum  | [pending, picking-up, on-time, late, delivered]  |   
---
## Distribution Center page 
|  Variable | Type | Instruction  |   
|---|---|---|
| id_center | int |  id of the distribution center |   
| latitude| int  | latitude of the distribution center  |   
| longtitude  | int  | longtitude of the distribution center  |   