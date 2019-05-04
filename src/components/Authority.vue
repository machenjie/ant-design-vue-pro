<!--template functional>
  <div></div>
</template-->
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode, CreateElement, RenderContext } from "vue";
import Auth from "@/utils/Auth";

@Component({
  functional: true,
  render(createElement: CreateElement, hack: RenderContext): VNode {
    return createElement(
      "div",
      Auth.checkAuthority(hack.props.authorized)
        ? hack.scopedSlots.default({})
        : null
    );
  }
})
export default class Authority extends Vue {
  @Prop() authorized!: string[];
}
</script>
