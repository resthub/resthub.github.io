---
layout: docs
title: Testing
permalink:  testing/
prev: spring/validation
next: router
---

<div class="toc"></div>

The following test stack is included in the RESThub test module:

* Test framework with [TestNG](http://testng.org/doc/documentation-main.html).
  If you use Eclipse, don't forget to install the [TestNG plugin](http://testng.org/doc/eclipse.html).
* Assertion with [Fest Assert 2](https://github.com/alexruiz/fest-assert-2.x/wiki)
* Mock with [Mockito](http://code.google.com/p/mockito/)

RESThub also provides generic classes in order to make testing easier.

* `AbstractTest`: base class for your non transactional Spring aware unit tests
* `AbstractTransactionalTest`: base class for your transactional unit tests,
  preconfigured with Spring test framework
* `AbstractWebTest`: base class for your unit tests that need to run an embedded servlet container.

## Maven dependency

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-test</artifactId>
    <version>2.1.4</version>
    <scope>test</scope>
</dependency>
```

## Data provisioning and cleanup

It is recommended to initialize and cleanup test data shared by your tests using methods annotated with
TestNG's `@BeforeMethod` and `@AfterMethod` and using your repository or service classes.

<div class="alert alert-warning">
    With JPA the default deleteAll() method does not manage cascade delete, so for your data cleanup
    you should use the following code in order to get your entities removed with cascade delete support:
</div>

```java
Iterable<MyEntity> list = repository.findAll();
for (MyEntity entity : list) {
    repository.delete(entity);
}
```

## Usage

* `AbstractTest` or `AbstractTransactionalTest`:

```java
@ActiveProfiles("resthub-jpa")
public class SampleRepositoryTest extends AbstractTransactionalTest {

    private SampleRepository repository;

    @Inject
    public void setRepository(SampleRepository repository) {
        this.repository = repository;
    }

    @AfterMethod
    public void tearDown() {
        for (Sample resource : repository.findAll()) {
            repository.delete(resource);
        }
    }

    @Test
    public void testSave() {
        Sample entity = repository.save(new Sample());
        Assertions.assertThat(repository.exists(entity.getId())).isTrue();
    }
}
```

* `AbstractWebTest`:

```java
public class SampleRestControllerTest extends AbstractWebTest {

    public SampleRestControllerTest() {
        // Call AbstractWebTest(String profiles) constructor
        super("resthub-web-server,resthub-jpa");
    }

    // Cleanup after each test
    @AfterMethod
    public void tearDown() {
        this.request("sample").delete();
    }

    @Test
    public void testCreateResource() {
        Sample r = this.request("sample").jsonPost(new Sample("toto")).resource(Sample.class);
        Assertions.assertThat(r).isNotNull();
        Assertions.assertThat(r.getName()).isEqualTo("toto");
    }
}
```

.

* A sample assertion:

```java
Assertions.assertThat(result).contains("Albert");
```

## Integration test

A good practice is to separate unit tests from integration tests. The unit tests are designed to test
only a specific layer of your application, ignoring other layers by mocking them
(see [Mockito](http://code.google.com/p/mockito/)).
The integration tests are designed to test all the layers of your application in real condition with complex
scenarii.

Maven allow us to do this separation by introducing the integration-test phase.
To use this phase, add the following snippet to your pom.xml:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>2.15</version>
    <executions>
        <execution>
            <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

With this plugin, Maven will seek Java files matching "\*IT.java" in test directory.
And run them during the integration-test phase.

You have 2 way (mutually exclusives) for writing you integration tests. Both approaches have pros and
cons, so choose the one that fit the best to your needs. In both case the test you write is not in a Spring
context (Spring is runned in the embeded Jety server), so you should write your test using mainly RESThub web
client (that does not ue Spring at all) and assertions.

### Option 1 - Use embedded Jetty

Extend your test with `AbstractWebTest` (as the exemple above). This class will take care to run jetty.
Jetty will run once (by default) for all tests and will stop at the end of the JVM.

### Option 2 - Use Maven Jetty plugin

Add the following snippet to the jetty configuration in your pom.xml:

```xml
    <plugin>
        <groupId>org.mortbay.jetty</groupId>
        <artifactId>jetty-maven-plugin</artifactId>
        <executions>
            <execution>
                <id>start-jetty</id>
                <phase>pre-integration-test</phase>
                <goals>
                    <goal>run</goal>
                </goals>
                <configuration>
                    <scanIntervalSeconds>0</scanIntervalSeconds>
                    <daemon>true</daemon>
                </configuration>
            </execution>
            <execution>
                <id>stop-jetty</id>
                <phase>post-integration-test</phase>
                <goals>
                    <goal>stop</goal>
                </goals>
            </execution>
        </executions>
    </plugin>
```

Now if you build the project, maven will run unit tests, then package the application,
then run jetty, then run integration test en finaly stop jetty. You can also run your application with
`jetty:run` and run separately and manualy you integration test in your IDE.
It's usefull to build quickly all your integration tests.
