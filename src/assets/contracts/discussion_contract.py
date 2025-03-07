class Discussion:

    def __init__(self):
        self.discussion = Storage('discussion')

    def add_issue(self, text):
        self.discussion.append({'text': text})

    def get_issues(self):
        return [self.discussion[key]['text'] for key in self.discussion]