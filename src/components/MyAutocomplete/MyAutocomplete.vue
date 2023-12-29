<template>
  <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" placeholder=" 请选择或输入" v-bind="attrs">

    <!-- @select="handleSelect" @change="changeHandle" -->

    <!-- <template #default="{ item }">
      <div class="value">{{ item }}</div>
    </template> -->



    <template v-for="(index, name) in $slots" v-slot:[name]="{ item }">
      <slot :name="name" v-bind="{ prop }"  :item="item"></slot>
      <!-- {{ item }} -->


    </template>

  </el-autocomplete>

  <!-- vv:{{ { state1 } }} -->
</template>
<!-- 这个组件需要v-model和dataList字符串数组
  prop就是读取的值
       <MyAutocomplete v-model="data.value" :dataList="_dataList"></MyAutocomplete>
-->
<script lang="ts" setup>
import { onMounted, ref, watch, computed, useAttrs, toRef } from 'vue'

interface RestaurantItem {
  value: string
  link: string
}

const attrs = useAttrs()

const props = defineProps({
  dataList: Array,
  modelValue: String,
  key: String,
  prop: String,
})

const emit = defineEmits(['update:model-value'])



// const state1 = toRef(props.modelValue)
const state1 = ref('')


// const state2 = ref('')

// const restaurants = ref<RestaurantItem[]>([])

const querySearch = (queryString: string, cb: any) => {

  // console.log("props.dataList", props.dataList);

  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      // restaurant.value.toLowerCase().includes(queryString.toLowerCase())
    )
  }
}
const loadAll = () => {
  return [
    // { value: 'vue', link: 'https://github.com/vuejs/vue' },
    // { value: 'element', link: 'https://github.com/ElemeFE/element' },
    // { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    // { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    // { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    // { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    // { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}




const handleSelect = (item: RestaurantItem) => {
  console.log(item)
  // emit('update:model-value', item);
}
const changeHandle = (value: string) => {
  console.log("changeHandle", value);

  emit('update:model-value', value);
  // emit('change', value);
}

onMounted(() => {
  // restaurants.value = loadAll()

  // restaurants.value = props.dataList.map((item) => {
  //   return {
  //     value: item
  //   }
  // })
})

// 值被改变触发v-model的改变绑定值
watch(() => props.modelValue, (value, oldVal) => {
  // console.log(value, oldVal);

  state1.value = value
  // emit('update:model-value', value);
}, {
  immediate: true
}
)
// 值被改变触发v-model的改变绑定值
watch(state1, (value, oldVal) => {
  // console.log(value, oldVal);


  emit('update:model-value', value);
},
  {
    immediate: true
  })

const restaurants = computed(() => {
  return props.dataList.map((item) => {

    // console.log(props.prop, "props.prop", props.dataList);

    if (props.prop) {
      if (props.prop.includes(".")) {
        // 传如带属性. 的
        let itemVal = item
        const kesArr = props.prop.split(".");//["key","chilren"]
        kesArr.forEach(keyItem => {
          keyItem = keyItem.trim()
          itemVal = itemVal[keyItem]
        })


        return {
          ...item,
          value: itemVal,
        }

      } else {
        // prop
        return {
          ...item,
          value: item[props.prop]


        }
      }

    } else {

      // {
      //   value: prop.xxxx
      //  }


      return {
        ...item,
        value: item


      }


    }

  })

})
</script>
