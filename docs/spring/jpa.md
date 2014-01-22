---
layout: docs
title: JPA support
permalink:  jpa/
prev: spring/layout
next: spring/mongo
---

<div class="toc"></div>

JPA support is based on Spring Data JPA and includes by default the H2 in memory database. It includes the following dependencies:

* Spring Data JPA {{site.spring-data-jpa-version}} [reference manual](http://static.springsource.org/spring-data/data-jpa/docs/{{site.spring-data-jpa-docs-version}}/reference/html/)
  and [Javadoc](http://static.springsource.org/spring-data/data-jpa/docs/{{site.spring-data-jpa-docs-version}}/api/)
* Hibernate {{site.hibernate-version}} [documentation](http://docs.jboss.org/hibernate/orm/{{site.hibernate-docs-version}}/manual/en-US/html/)
* H2 embedded database {{site.h2-version}} [documentation](http://www.h2database.com/html/main.html)

Thanks to Spring Data, it is possible to create repositories (also sometimes named DAO) by writing only the interface.

## Configuration

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-jpa</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>
```

In order to import its [default configuration](https://github.com/resthub/resthub-spring-stack/blob/master/resthub-jpa/src/main/resources/resthubContext.xml),
your should activate the resthub-jpa Spring profile in your WebAppInitializer class:

```java
XmlWebApplicationContext appContext = new XmlWebApplicationContext();
appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-web-server");
```

Since version 3.1, Spring allows to scan entities in different modules using the same `PersitenceUnit`,
which is not possible with default JPA behaviour. You have to specify the packages where Spring should
scan your entities by creating a database.properties file in your resources folder, with the following content:

```
persistenceUnit.packagesToScan = com.myproject.model
```

Now, entities within the com.myproject.model packages will be scanned, no need for persistence.xml JPA file.


You also need to add an applicationContext.xml file in order to scan your repository package.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jpa="http://www.springframework.org/schema/data/jpa"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/data/jpa
                           http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">

    <jpa:repositories base-package="com.myproject.repository" />

</beans>
```

You can customize the default configuration by adding a database.properties resource with one or more of
the following keys customized with your values (see [BoneCP documentation for details](http://jolbox.com/)).
You should include only the customized ones.

RESThub JPA default properties are:

```
dataSource.driverClassName = org.h2.Driver
dataSource.url = jdbc\:h2\:mem\:resthub;DB_CLOSE_DELAY=-1;MVCC=TRUE
dataSource.username = sa
dataSource.password =
dataSource.minConnectionsPerPartition = 2
dataSource.maxConnectionsPerPartition = 4
dataSource.partitionCount = 3
dataSource.idleConnectionTestPeriodInSeconds = 60
dataSource.statementsCacheSize = 100
dataSource.connectionTestStatement = /* ping*/ SELECT 1
```

RESThub Hibernate default properties are:

```
hibernate.dialect = org.hibernate.dialect.H2Dialect
hibernate.show_sql = false
hibernate.format_sql = true
hibernate.hbm2ddl.auto = update
hibernate.cache.use_second_level_cache = true
hibernate.cache.provider_class = net.sf.ehcache.hibernate.EhCacheRegionFactory
hibernate.id.new_generator_mappings = true
persistenceUnit.packagesToScan =
```

## Extend JPA properties

RESThub provides an extension point if you need to add new jpa properties that are not already defined in
RESTHub core jpa properties (see above). This hook is based on spring maps and its merge capacity.

Indeed, resthub entityManagerFactory includes an larger map of properties with an external bean reference :

```xml
<bean id="entityManagerFactory"
    class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">

    ...

    <property name="jpaProperties" ref="jpaProperties" />
</bean>

...

<bean id="jpaProperties" parent="resthubCoreJpaProperties">
    <property name="sourceMap">
        <map merge="true"/>
    </property>
</bean>
```

By default the map contains only core resthub jpa properties but if you need to add JPA or Hibernate properties,
you only have to override the `jpaProperties` bean with your own configuration. Provided properties will be merged
with resthub core properties.

Simply add in you applicationContext :

```xml
<bean id="jpaProperties" parent="resthubCoreJpaProperties">
    <property name="sourceMap">
        <map merge="true">
            <entry key="my.key" value="my.value" />
        </map>
    </property>
</bean>
```

If this extension point is not sufficient, simply override `dataSource` and `entityManagerFactory` beans in
your applicationContext.xml.

## Usage

```java
public interface TodoRepository extends JpaRepository<Todo, String> {
    List<Todo> findByContentLike(String content);
}
```

## Console

H2 console allows you to provide a SQL requester for your embedded default H2 database.
It is included by default in JPA archetypes.

In order to add it to your JPA based application, add these lines to your WebAppInitializer class:

```java
public void onStartup(ServletContext servletContext) throws ServletException {
    ...
    ServletRegistration.Dynamic h2Servlet = servletContext.addServlet("h2console", WebServlet.class);
    h2Servlet.setLoadOnStartup(2);
    h2Servlet.addMapping("/console/database/*");
}
```

When running the webapp, the database console will be available at <http://localhost:8080/console/database/>
URL with following parameters:

* JDBC URL: jdbc\:h2\:mem\:resthub
* Username: sa
* Password: