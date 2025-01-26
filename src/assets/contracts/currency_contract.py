class Currency:

    # recommended mint=100, burn=0.0003
    def __init__(self):
        self.accounts = Storage('accounts')
        if 'centralAccount' not in self.accounts:
            creationTime = timestamp()
            self.accounts['centralAccount'] = {'balanceOf':0, 'creationTime': creationTime, 'elapsedDays': 0}
            self.accounts[master()] = {'balanceOf':0, 'creationTime': creationTime, 'elapsedDays': 0}

    def updateBalance(self, account):
        account_data = self.accounts[account].to_dict()
        # to count days divide by 86400. for testing, divide by 60
        daysPassed = elapsed_time(account_data['creationTime'], timestamp()) // 60 - account_data['elapsedDays']
        if daysPassed <= 0:
            return

        burnFactor = 100 - parameter('burn')
        mint = parameter('mint')
        for i in range(daysPassed):
            account_data['balanceOf'] *= burnFactor
            account_data['balanceOf'] += mint
        account_data['elapsedDays'] += daysPassed
        self.accounts[account] = account_data

    def transfer(self, to, value):
        sender = master()
        self.updateBalance(sender)
        self.updateBalance(to)

        sender_account = self.accounts[sender].to_dict()
        to_account = self.accounts[to].to_dict()
        if sender_account['balanceOf'] >= value:
            sender_account['balanceOf'] -= value
            to_account['balanceOf'] += value
            self.accounts[sender] = sender_account
            self.accounts[to] = to_account
            return True
        return False

    def getBalance(self):
        account = master()
        self.updateBalance(account)
        return self.accounts[account]['balanceOf']

    def before_parameters_update(self):
        for account in self.accounts:
            self.updateBalance(account)
