---
title:  Spring data
date: 2021-11-26 19:59:13
tags:
---
Spring repository（Spring data common） 负责定义应用和数据库服务之间的抽象API接口。
Spring repository 从对接的数据库类型上看有多种实现，关系型数据库、nosql、内存数据库、云数据库等等。

Spring repository 对关系型数据库的实现，最主流的有 Spring Data JPA，底层使用Hibernate 这种ORM框架，此外原生一点的实现有 Spring Data JDBC。

不同的实现，需要接入不同的数据源，不同的数据源由统一的公共API操作。各数据源需要单独配置，配置相应的连接参数，如使用jdbc-Mysql作为数据源，则要为DataSource配置相应的连接串、账号、密码等等。

小结
Spring repository  --> Spring Data JPA/JDBC/MongoDB.... --> mysql/oracle/h2/... 

## Spring JPA
### 引入步骤
要使用Spring Data，有一下步骤
1. pom 引入 spring-boot-starter-data-jpa
	1. > 自动依赖 spring Data common
2. pom 引入DataSource需要的引擎，如Driven等
3. 自行在 Configuration 中配置 DataSource
4. 编写model的interface，继承对应的repository，如JPA实现则继承JPArepository。Spring Data 将会自动的扫描所有 Repository，并通过动态代理来实现它。
5. 在Configuration 中设置 @EnableJpaRepositories 使Spring Data生效

####设置
```java
@EnableJpaRepositories(basePackages = "com.baeldung.spring.data.persistence.repository") 
public class PersistenceConfig { 
    ...
}
```

### 自定义DB操作
Spring Data 默认已经对Repository 生成好基本的db操作了。但难免有时还是无法满足需求，此时需要自定义DB操作，有如下方式可选：
1. 命名规则自定义查询
2. 手动sql自定义查询


#### 命名规则自定义查询
在 Repository 接口中定义新方法，如果Entity中有name字段，不妨可以在Repository 接口中新增 findBy**Name**方法，这样Spring Data会自动生成对应的实现。
```java
public interface IFooDAO extends JpaRepository<Foo, Long> {
    Foo findByName(String name);
}
```
更多自动化关键字可以查阅：https://docs.spring.io/spring-data/data-jpa/docs/current/reference/html/#jpa.query-methods.query-creation 

#### 手动sql自定义查询
示例
```java
@Query("SELECT f FROM Foo f WHERE LOWER(f.name) = LOWER(:name)")
Foo retrieveByName(@Param("name") String name);
```

## 未分类
### @Modifying
可在@Query上使用@Modifying注释，此时@Query可以执行查询以外的sql，如增、删、改。

### @Modifying 和 命名方法 操作的区别
后者会先把DB的数据全查出来，然后逐个做操作，这样可以通过AOP对每条数据设置前置操作。而前者会直接把操作语句扔到DB执行。

### @Modifying 与持久化容器的过期数据
通过 @Modifying 执行的操作，不会同步给持久化容器，此时持久化容器的数据处于过期状态。一个方法是通过手动清空持久化容器。但也可以通过以下方式让其自动清空。
```java
@Modifying(clearAutomatically = true)
```

但如果清空持久化容器，则会导致未flush的数据也被清除，导致未保存的更改被丢弃。可以通过以下属性来在清空前flush。
```java
@Modifying(flushAutomatically = true)
```

### @Query
@Query的优先度优先于按方法名查询。

@Query 优先使用JPQL语法，如果要使用原生SQL语法，需要指定native=ture。

```java
//JPQL语法
@Query("SELECT u FROM User u WHERE u.status = 1")
Collection<User> findAllActiveUsers();

//原生SQL
@Query(
  value = "SELECT * FROM USERS u WHERE u.status = 1", 
  nativeQuery = true)
Collection<User> findAllActiveUsersNative();
```

### 连接持久层
至少需要：
1. datasource，涉及和维护driver、username、password
2. SqlSessionFactory，用来连接服务器，创建sqlSession
3. mapper，定义相关的Query（在JPA中，一个方法就是一个mapper）

图示：
![](/images/Pasted%20image%2020201222154530.png)

#### JPA需要准备环境
对于JPA，是一回事。
1. DataSource
2. EntityManager —— 相当于SqlSessionFactory
3. Entity Repository —— 相当于Mapper

#### Mybatis
需要注册Bean org.mybatis.spring.mapper.MapperScannerConfigurer 或者 注解 @MapperScanner，来生效mybatis。该bean负责整合上述的组件到DAO的代理类中，开发者就可以通过dao接口来操作db了。
