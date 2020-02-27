<template>
    <div class="container">
        <vs-sidebar  color="primary" parent="body" class="sidebar" spacer v-model="openFilter">
            <vs-row class="sidebarContainer">
                
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪所在地</vs-divider>
                    <select class="selectBox" v-model="filter.city">
                        <option value="">不拘</option>
                        <option :value="city.id" v-for="(city , key) in cityList" :key="key">{{city.name}}</option>
                    </select>
                </vs-col>
                
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪的種類</vs-divider>
                    <select class="selectBox" v-model="filter.kind">
                        <option value="">不拘</option>
                        <option value="貓">貓</option>
                        <option value="狗">狗</option>
                    </select>
                </vs-col>
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪的性別</vs-divider>
                    <select class="selectBox" v-model="filter.sex">
                        <option value="">不拘</option>
                        <option value="M">雄</option>
                        <option value="F">雌</option>
                    </select>
                </vs-col>
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪的體型</vs-divider>
                    <select class="selectBox" v-model="filter.bodytype">
                        <option value="">不拘</option>
                        <option value="SMALL">小型</option>
                        <option value="MEDIUM">中型</option>
                        <option value="BIG">大型</option>
                    </select>
                </vs-col>
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪的年紀</vs-divider>
                    <select class="selectBox" v-model="filter.age">
                        <option value="">不拘</option>
                        <option value="CHILD">幼年</option>
                        <option value="ADULT">成年</option>
                    </select>
                </vs-col>
                <vs-col vs-w="12">
                    <vs-divider color="#0984e3">浪浪是否絕育</vs-divider>
                    <select class="selectBox" v-model="filter.sterilization">
                        <option value="">不拘</option>
                        <option value="T">是</option>
                        <option value="F">否</option>
                    </select>
                </vs-col>
                
                <vs-col vs-w="12">
                    <vs-divider/>
                    <vs-button color="#00b894" type="border" style="width:100%" @click="resetFilter">重置搜尋</vs-button>
                </vs-col>
                
                <vs-col vs-w="12" class="pwaInstall">
                    <vs-divider color="#636e72">安裝我變成App</vs-divider>
                    <vs-button color="#fdcb6e" type="filled" style="width:100%" @click="appInstall">加我到首頁喔</vs-button>
                </vs-col>
            </vs-row>
            
            
    
        </vs-sidebar>
        
        <vs-row class="header">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                <vs-button radius color="#74b9ff"  type="flat" text-color="#0984e3"  icon="search" @click="openFilter = true">
                </vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                浪浪領養資訊小幫手
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                <vs-button radius color="#2d3436"  type="flat" text-color="#2d3436"  icon="arrow_back_ios" 
                    :disabled="page == 1" @click="prevPage()">
                </vs-button>
                <vs-button radius color="#2d3436"  type="flat" text-color="#2d3436"  icon="arrow_forward_ios" 
                    :disabled="!hasNext" @click="nextPage()">
                </vs-button>
            </vs-col>
        </vs-row>
        <!-- data -->
        <vs-row>
            <vs-col v-for="(animal , key) in animalList" :key="key"  vs-w="12" 
                class="listCard">
                <div class="imgContainer">
                    <img :src="animal.album_file" @error="onImgError"/>
                    <vs-chip color="#0984e3" class="cityTag">
                        {{animal.animal_status | open}}
                    </vs-chip>
                    <vs-chip color="#00b894" class="shelterTag">
                        {{objCityList[animal.animal_area_pkid]}}
                    </vs-chip>
                </div>
                <div class="sampleData">
                    <div>
                        收容所 : {{objShelterList[animal.animal_shelter_pkid]}} 
                    </div>
                    <div class="smallGrey">
                        {{animal.animal_kind}} | {{animal.animal_bodytype | bodySize}} | {{animal.animal_sex | sex}} | {{animal.animal_age | age}}
                    </div>
                </div>
                <div>
                    <vs-button color="#74b9ff" text-color="#0984e3" type="border" class="detailBtn" @click="openAnimalDetail(animal)">浪浪詳細資料</vs-button>
                </div>
                <vs-divider/>
            </vs-col>
        </vs-row>
        <!-- popup -->
        <vs-popup class="dialogDetail"  :title="animalDetailData.animal_place" :active.sync="openDetailData">
            <div class="imageDetailContainer">
                <img :src="animalDetailData.album_file" @error="onImgError"/>
            </div>
            <section>
                <vs-divider  color="#0984e3">
                    浪浪所在地區
                </vs-divider>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        縣市地區
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{objCityList[animalDetailData.animal_area_pkid]}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        收容所
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{objShelterList[animalDetailData.animal_shelter_pkid]}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        收容所地址
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.shelter_address}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        收容所電話
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.shelter_tel}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        所在位置
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_place}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        尋獲地
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_foundplace}}
                    </vs-col>
                </vs-row>
            </section>
            <section>
                <vs-divider  color="#00cec9">
                    浪浪的特徵
                </vs-divider>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪類型
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_kind}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪性別
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_sex | sex}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪體型
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_bodytype | bodySize}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪年紀
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_age | age}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪毛色
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_colour }}
                    </vs-col>
                </vs-row>
            </section>
            <section>
                <vs-divider  color="#e17055">
                    浪浪的狀態
                </vs-divider>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        浪浪絕育
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_sterilization | typeDete}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        狂犬疫苗施打
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_bacterin | typeDete}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        認養狀態
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.typeDete | open}}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        認養時間(起)
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_opendate }}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        認養時間(迄)
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_closeddate }}
                    </vs-col>
                </vs-row>
            </section>
            <section>
                <vs-divider  color="#fdcb6e">
                    其他資料
                </vs-divider>
                <vs-row>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        標題資料
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_title }}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        資料備註
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_remark }}
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="4">
                        其他說明
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="8">
                        {{animalDetailData.animal_caption }}
                    </vs-col>
                </vs-row>
            </section>
        </vs-popup>
    </div>
</template>

<script>
import _array from 'lodash/array'
import animalPng from '@/assets/animalmiss.png'
export default {
    name : 'Index',
    data : () => ({
        openFilter : false,
        openDetailData : false,
        page : 1,
        pageLimit : 30,
        hasNext : true,
        pwaInstallObj : null,
        filter : {
            city : "",
            kind : "",
            sex : "",
            bodytype : "",
            age : "",
            sterilization : ""
        },
        animalDetailData : {
            album_file:"",
            album_update:"",
            animal_age:"",
            animal_area_pkid:"11",
            animal_bacterin:"F",
            animal_bodytype:"BIG",
            animal_caption:"",
            animal_closeddate:"2999-12-31",
            animal_colour:"黑色",
            animal_createtime:"2020/02/25",
            animal_foundplace:"東興路",
            animal_id:146286,
            animal_kind:"狗",
            animal_opendate:"",
            animal_place:"宜蘭縣流浪動物中途之家",
            animal_remark:"",
            animal_sex:"M",
            animal_shelter_pkid:78,
            animal_status:"OPEN",
            animal_sterilization:"T",
            animal_subid:"1090230",
            animal_title:"",
            animal_update:"2020/02/25",
            cDate:"2020/02/25",
            shelter_address:"宜蘭縣五結鄉成興村利寶路60號",
            shelter_name:"宜蘭縣流浪動物中途之家",
            shelter_tel:"039602350 分機620",
        },
        cityList :[ 
            {id : 2 , name : '台北市' , search : false },
            {id : 3 , name : '新北市' , search : false },
            {id : 4 , name : '基隆市' , search : false },
            {id : 5 , name : '宜蘭縣' , search : false },
            {id : 6 , name : '桃園市' , search : false },
            {id : 7 , name : '新竹縣' , search : false },
            {id : 8 , name : '新竹市' , search : false },
            {id : 9 , name : '苗栗縣' , search : false },
            {id : 10 , name : '台中市' , search : false },
            {id : 11 , name : '彰化縣' , search : false },
            {id : 12 , name : '南投縣' , search : false },
            {id : 13 , name : '雲林縣' , search : false },
            {id : 14 , name : '嘉義縣' , search : false },
            {id : 15 , name : '嘉義市' , search : false },
            {id : 16 , name : '台南市' , search : false },
            {id : 17 , name : '高雄市' , search : false },
            {id : 18 , name : '屏東縣' , search : false },
            {id : 19 , name : '花蓮縣' , search : false },
            {id : 20 , name : '台東縣' , search : false },
            {id : 21 , name : '澎湖縣' , search : false },
            {id : 22 , name : '金門縣' , search : false },
            {id : 23 , name : '連江縣' , search : false },
        ],
        shelterList : [
            {id : 48 , name : '基隆市寵物銀行' , search : false },
            {id : 49 , name : '臺北市動物之家' , search : false },
            {id : 50 , name : '新北市板橋區公立動物之家' , search : false },
            {id : 51 , name : '新北市新店區公立動物之家' , search : false },
            {id : 53 , name : '新北市中和區公立動物之家' , search : false },
            {id : 55 , name : '新北市淡水區公立動物之家' , search : false },
            {id : 56 , name : '新北市瑞芳區公立動物之家' , search : false },
            {id : 58 , name : '新北市五股區公立動物之家' , search : false },
            {id : 59 , name : '新北市八里區公立動物之家' , search : false },
            {id : 60 , name : '新北市三芝區公立動物之家' , search : false },
            {id : 61 , name : '桃園市動物保護教育園區' , search : false },
            {id : 62 , name : '新竹市動物收容所' , search : false },
            {id : 63 , name : '新竹縣動物收容所' , search : false },
            {id : 67 , name : '臺中市動物之家南屯園區' , search : false },
            {id : 68 , name : '臺中市動物之家后里園區' , search : false },
            {id : 69 , name : '彰化縣流浪狗中途之家' , search : false },
            {id : 70 , name : '南投縣公立動物收容所' , search : false },
            {id : 71 , name : '嘉義市流浪犬收容中心' , search : false },
            {id : 72 , name : '嘉義縣流浪犬中途之家' , search : false },
            {id : 73 , name : '臺南市動物之家灣裡站' , search : false },
            {id : 74 , name : '臺南市動物之家善化站' , search : false },
            {id : 75 , name : '高雄市壽山動物保護教育園區' , search : false },
            {id : 76 , name : '高雄市燕巢動物保護關愛園區' , search : false },
            {id : 77 , name : '屏東縣流浪動物收容所' , search : false },
            {id : 78 , name : '宜蘭縣流浪動物中途之家' , search : false },
            {id : 79 , name : '花蓮縣流浪犬中途之家' , search : false },
            {id : 80 , name : '臺東縣動物收容中心' , search : false },
            {id : 81 , name : '連江縣流浪犬收容中心' , search : false },
            {id : 82 , name : '金門縣動物收容中心' , search : false },
            {id : 83 , name : '澎湖縣流浪動物收容中心' , search : false },
            {id : 89 , name : '雲林縣流浪動物收容所' , search : false },
            {id : 92 , name : '新北市政府動物保護防疫處' , search : false },
            {id : 96 , name : '苗栗縣生態保育教育中心' , search : false },
        
        ],
        animalList : [],
    }),
    filters : {
        open(status){
            let obj = {
                NONE : '未公告',
                OPEN : '開放認養',
                ADOPTED : '已認養',
                OTHER : '其他',
                DEAD : '死亡'
            }
            return obj[status];
        },
        sex(sex) {
            if(sex == 'M') {
                return '雄性';
            } else if (sex == 'F') {
                return '雌性';
            } else {
                return '未知';
            }
        },
        bodySize(type) {
            if(type == 'SMALL') {
                return '小型';
            } else if (type == 'MEDIUM') {
                return '中型';
            } else {
                return '大型';
            }
        },
        age(age){
            if(age == 'CHILD') {
                return '幼年'
            } else {
                return '成年'
            }
        },
        typeDete(status) {
            if(status == 'T') {
                return '是';
            } else if (status == 'F') {
                return '否';
            } else {
                return '未知';
            }
        }
    },
    computed : {
        objCityList(){
            let obj = {};
            for (const city of this.cityList) {
                obj[city.id] = city.name
            }
            return obj;
        },
        objShelterList(){
            let obj = {};
            for (const she of this.shelterList) {
                obj[she.id] = she.name
            }
            return obj;
        }
    },
    asyncData() {
        return {}
    },
    methods : {
        onImgError(el){
            console.log(el)
            el.target.src = animalPng;
        },
        openAnimalDetail(animalData){
            this.$set(this , 'animalDetailData' , animalData);
            this.openDetailData = true;
        },
        
        prevPage() {
            if(this.page >= 1) {
                this.page--;
                this.getDataList(this.page);
            }
        },

        nextPage() {
            if(this.hasNext) {
                this.page++;
                this.getDataList(this.page);
            }
        },

        resetFilter() {
            this.page = 1;
            this.hasNext = true;
            this.openFilter = false;
            this.getDataList(this.page);
        },

        appInstall() {
            if(this.pwaInstallObj !== null) {
                this.pwaInstallObj.prompt();
                this.pwaInstallObj.userChoice.then( result => {
                    console.log(result.outcome);
                    if(result.outcome == 'dismissed') {
                        console.log('User cancelled home screen install');
                    }
                    else {
                        console.log('User added to home screen');
                    }
                });
            }
        },

        async getDataList(page) {
            this.$vs.loading({type:'sound'});
            let top = this.pageLimit;
            let skip = (page - 1) * this.pageLimit;
            let filter = ''; //搜尋條件
            if(this.filter.city !== "") {
                filter += `&animal_area_pkid=${this.filter.city}`
            }
            if(this.filter.kind !== "") {
                filter += `&animal_kind=${this.filter.kind}`
            }
            if(this.filter.sex !== "") {
                filter += `&animal_sex=${this.filter.sex}`
            }
            if(this.filter.bodytype !== "") {
                filter += `&animal_bodytype=${this.filter.bodytype}`
            }
            if(this.filter.age !== "") {
                filter += `&animal_age=${this.filter.age}`
            }
            if(this.filter.sterilization !== "") {
                filter += `&animal_sterilization=${this.filter.sterilization}`
            }
            let url = `https://us-central1-map-test-234703.cloudfunctions.net/function-1?top=${top}&skip=${skip}${filter}`
           
            let list = await this.$fetchGet(url);
            list.map( l =>{
                l.album_file = l.album_file.replace('http' , 'https');
            });

            this.animalList = list;
            if(this.animalList.length < 30) {
                this.hasNext = false;
            }

            this.$vs.loading.close();

            if(this.animalList.length == 0) {
                this.$vs.notify({title : 'Oops!!' , text :'您的搜尋條件沒有找到資料!' , color : '#e17055' , position : 'bottom-center' })
            }
        }
    },
    mounted() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt Event fired');
            // e.preventDefault();
            // Stash the event so it can be triggered later.
            this.pwaInstallObj = e;
            return false;
        });
        this.getDataList(this.page);
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin: 0 auto;
    min-height: 100vh;
    // max-height: 100vh;
    max-width: 100vw;
    padding : .5rem;
    color : #2d3436;
    
    .header{
        position:sticky;
        border:0px;
        border-bottom: 1px solid #666;
        min-height : 2rem;
        line-height: 2rem;
        text-align: center;
        top:.5rem;
        z-index: 10;
        background: white;
        box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.6);
    }
    .listCard {
        padding: 5px;
        margin: .5rem 0 0 0;
        .imgContainer {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            background: #efefef;
            border-radius: .5rem;
            img {
                min-width: 100%;
                min-height: 15rem;
                max-width: 100%;
                max-height: 15rem;
                border-radius: .5rem;
            }
            .cityTag {
                position:absolute;
                right : .5rem;
                bottom: 2.5rem;
            }
            .shelterTag {
                position:absolute;
                right : .5rem;
                bottom: .5rem;
            }
        }
        .sampleData {
            margin-top : .5rem;
            font-size: 1rem;
            line-height: 1.5rem;
            .smallGrey {
                color: #636e72;
                font-size:.75rem;
            }
        }
        .detailBtn {
            margin-top : .5rem;
            width:100%;
        }
    }
    
}
.sidebar {
    text-align: center;
    .sidebarContainer {
        padding : 0 .5rem;
        .selectBox {
            border-radius:.5rem;
            padding:.5rem;
            width: 100%
        }
        .pwaInstall {
            margin-top : .5rem;
        }
    }
    
}
.dialogDetail {
    background: #2d3436;
    .imageDetailContainer {
        background: #efefef;
        border-radius: .5rem;
        img {
            min-width: 100%;
            min-height: 15rem;
            max-width: 100%;
            max-height: 15rem;
            border-radius: .5rem;
        }
    }
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 55px;
    color: #35495e;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 25px 0px;
}

.subtitle {
    font-weight: 300;
    font-size: 1.1rem;
    color: #526488;
    word-spacing: 2px;
    padding-bottom: 15px;
    max-width: 600px;
}

.subtitle a {
    font-weight: 500;
    color: inherit;
}

.links {
    padding-top: 15px;
    margin-bottom: 20px;
}

.content-logos {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 500px;
}
.plus {
    font-size: 2.5rem;
    margin: 15px;
    color: #35495e;
}
.h3 {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    font-weight: 400;
    margin: 10px;
}
</style>
