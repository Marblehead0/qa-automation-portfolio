from locust import HttpUser, task\n\nclass DemoUser(HttpUser):\n    @task\n    def hello(self):\n        self.client.get('/')
