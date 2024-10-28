-- CreateTable
CREATE TABLE "AuthUser" (
    "user_seq" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "select_item" INTEGER[],

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("user_seq")
);

-- CreateTable
CREATE TABLE "SelectCategory" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "SelectCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "diary_seq" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "mood_level" INTEGER NOT NULL,
    "mood_emoji" TEXT NOT NULL,
    "event_info" TEXT,
    "event_with" TEXT,
    "emotion_type" TEXT,
    "emotion_detail" TEXT,
    "behavior_style" TEXT,
    "behavior_effect" TEXT,
    "behavior_reason" TEXT,
    "result_outcome" TEXT,
    "result_plan" TEXT,
    "self_goal" TEXT,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("diary_seq")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_user_id_key" ON "AuthUser"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SelectCategory_category_name_key" ON "SelectCategory"("category_name");

-- CreateIndex
CREATE INDEX "Diary_user_id_idx" ON "Diary"("user_id");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AuthUser"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
