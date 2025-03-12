class Issue:

    def __init__(self):
        self.details = Storage('details')
        self.comments = Storage('comments')
        self.proposals = Storage('proposals')
        self.votes = Storage('votes')

    def set_description(self, text):
        self.details['description'] = text

    def get_description(self):
        return self.details['description']
    
    def add_proposal(self, text):
        self.proposals.append(text)

    def get_proposals(self):
        return [self.proposals[key] for key in self.proposals]