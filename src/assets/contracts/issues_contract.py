class Issues:

    def __init__(self):
        self.issues = Storage('issues')

    def add_issue(self, issue):
        self.issues.append(issue)

    def get_issues(self):
        return [self.issues[key].get_dict() for key in self.issues]