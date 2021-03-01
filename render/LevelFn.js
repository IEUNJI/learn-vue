export default {
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      val: 'text'
    };
  },
  methods: {
    formChange(event) {
      this.val = event.target.value;
    }
  },
  render(h) {
    const { type, $slots, val } = this;
    const Tag = `h${type}`;
    return (
      <div a={1}>
        <span>{val}</span>
        <input type="text" value={val} onInput={this.formChange} />
      </div>
    );
  }
};
