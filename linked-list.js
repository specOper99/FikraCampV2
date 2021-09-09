class Node {
    constructor(value) {
        this.value = value
        this.next = null;
    }
}

class LinkedList {
    #head;
    #tail;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    /** This will accept value */
    append(value) { //! Add node to the end of the list
        let node = new Node(value);
        // if list is empty
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    prepend(value) { //! Add node to the beginning of the list
        let node = new Node(value);
        node.next = this.head;
        this.head = node;
    }

    pop() { //! Remove last node from the list
        let cur = this.head;

        //* no item exists
        if (!cur) return null;
        //* only one item exists
        if (!cur.next) {
            this.head = null;
            return cur;
        }
        // move till the 2nd last
        while (cur.next.next)
            cur = cur.next;

        let last = this.tail;
        this.tail = cur;
        this.tail.next = null;
        return last;
    }

    popFirst() {
        let first = this.head;
        if (this.head && this.head.next) {
            this.head = this.head.next;
            first.next = null;
        } else this.head = null;
        return first;
    }



    appendNodeToIndex(index) {
        // TODO: You should be able to complete this function
        //! After you finish the solution the FIRST person who will
        //! send a pull request with the correct code will merge his
        //! to the master branch
    }

    popNodeAtIndex(index) {
        // TODO: You should be able to complete this function
        //! After you finish the solution the FIRST person who will
        //! send a pull request with the correct code will merge his
        //! to the master branch
    }


    get head() {
        return this.head;
    }

    get tail() {
        return this.tail;
    }
}


const linkedList = new LinkedList();

linkedList.append("Some Value");
linkedList.prepend("Now this is the first value");
console.log(linkedList.pop());