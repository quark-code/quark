export class TestEvent extends Event {
    static eventName = 'test-event';

    constructor(prop1, prop2) {
        super(TestEvent.eventName, { bubbles: true, composed: true });
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
}

// Dispatching: this.dispatchEvent(new TestEvent('a', 1));
// Listening: this.addEventListener(TestEvent.eventName, ...);