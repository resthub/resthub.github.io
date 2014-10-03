```bash
~ $ mvn archetype:generate -Dfilter=org.resthub:

# choose the right archetype
# choose {{site.spring-stack-version}} version
# answer a few questions

~ $ cd /new/project

~/new/project $ mvn jetty:run

# Done ! See http://localhost:8080
```