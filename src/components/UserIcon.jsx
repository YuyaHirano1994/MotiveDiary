import React from "react";

// challenge_idからユーザー情報を検索し、ユーザーアイコンとネームをそのものを変えす
// パラメーターは
// challenge_id
// width Size
// height Size
// 返り値はAvatarそのものを返す

// sample: 6f9d6f2b-b5b5-435e-a403-d08b51235af6

/**
 *
 * @param {id} string // string
 * @returns
 */

const UserIcon = (props) => {
  return <div>{props.id}</div>;
};

export default UserIcon;
