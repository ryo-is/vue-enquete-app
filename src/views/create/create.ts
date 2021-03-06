import { Component, Vue } from "vue-property-decorator"
import { EnqueteAppAPIClass } from "@/gqlServices/enquete_app_api_service"
import router from "@/router"

@Component({})
export default class Create extends Vue {
  public title: string = "アンケート作成"
  public enqueteId: string = ""
  public enqueteTitle: string = ""
  public description: string = ""
  public answerItems: string[] = []
  public addAnswerItemText: string = ""
  public selectableNumber: number = 1
  public enquerePageUrl: string = ""
  public enqueteUrlArea: boolean = false

  /**
   * Topページに戻る
   */
  public returnTopPage() {
    return router.push("/")
  }

  /**
   * 選択肢の追加
   */
  public addAnswerItem() {
    if (this.addAnswerItemText !== "") {
      this.answerItems.push(this.addAnswerItemText)
      this.addAnswerItemText = ""
    }
  }

  /**
   * アンケート作成
   */
  public async submitCreateEnquete() {
    if (this.enqueteTitle === "") {
      return alert("タイトルは必須です")
    } else if (this.description === "") {
      return alert("説明は必須です")
    } else if (this.answerItems.length <= 0) {
      return alert("選択肢は必ず1つ以上必要です")
    }
    this.enqueteId = await EnqueteAppAPIClass.createEnquete(
      this.enqueteTitle, this.description, this.answerItems, this.selectableNumber)
    this.enquerePageUrl = location.origin + "/enquete/" + this.enqueteId
    this.enqueteUrlArea = true
    // return router.push("/enquete/" + enqueteId)
  }

  /**
   * 入力内容の初期化
   */
  public resetInputArea() {
    this.enqueteTitle = ""
    this.description = ""
    this.answerItems = []
    this.enquerePageUrl = ""
    this.enqueteUrlArea = false
  }

  /**
   * アンケート回答ページに遷移
   */
  public linkEnquetePage() {
    return router.push("/enquete/" + this.enqueteId)
  }
}
