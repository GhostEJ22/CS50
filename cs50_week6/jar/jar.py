

class Jar:
    def __init__(self, capacity=12):
        self.capacity = capacity
        self.size = 0

    def __str__(self):
        return f"{'🍪'*self.size}"

    def deposit(self, n):
        if n + self.size > self.capacity:
            raise ValueError('Exceed capacity')
        self.size += n

    def withdraw(self, n):
        if self.size - n < self.capacity:
            raise ValueError('Not enough cookies to remove it')
        self.size -= n

    @property
    def capacity(self):
        return self._capacity

    @capacity.setter
    def capacity(self):
        if capacity < 0:
            raise ValueError("Not valid capacity")
        self.capacity = capacity

    @property
    def size(self):
        return self._size

    def size(self):
        if size < 0 or size > self.capacity:
            self._size = size


#assert means to check if something true
jar = Jar()
assert jar.capacity == 12
assert str(jar) == ""
jar.deposit(5)
assert str(jar) == "🍪🍪🍪🍪🍪"
jar.withdraw(3)
assert jar.size == 3