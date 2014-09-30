```bash
~ $ mvn archetype:generate -DarchetypeGroupId=org.resthub \
    -DarchetypeArtifactId=resthub-jpa-backbonejs-archetype -DarchetypeVersion={{site.spring-stack-version}} \
    -DarchetypeRepository=remote

# choose archetype & answer some questions

~ $ cd /new/project

~/new/project $ mvn jetty:run

# Done ! See http://localhost:8080
```